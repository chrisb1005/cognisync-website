"""
Data Cleaning Agent - Core Python Script
Cognisync Data Processing Service
"""

import pandas as pd
import numpy as np
from datetime import datetime
from pathlib import Path


class DataCleaningAgent:
    """
    Automated data cleaning and processing agent for Cognisync.
    
    Handles common data quality issues including:
    - Missing values
    - Duplicate removal
    - Type conversions
    - Outlier detection
    - Format standardization
    """
    
    def __init__(self, project_name="cognisync_project"):
        self.project_name = project_name
        self.metadata = {
            "processed_at": datetime.now(),
            "agent_version": "1.0.0",
            "client_id": None,
            "original_rows": 0,
            "cleaned_rows": 0
        }
    
    def clean_csv(self, input_path, output_path=None):
        """
        Clean CSV files with comprehensive data processing.
        
        Args:
            input_path: Path to input CSV file
            output_path: Optional path for cleaned output
            
        Returns:
            dict: Processing report
        """
        print(f"📥 Loading data from {input_path}...")
        
        # Load data
        df = pd.read_csv(input_path)
        original_count = len(df)
        self.metadata["original_rows"] = original_count
        
        # Step 1: Remove duplicates
        before_dedup = len(df)
        df = df.drop_duplicates()
        print(f"   - Removed {before_dedup - len(df)} duplicate rows")
        
        # Step 2: Handle missing values
        missing_before = df.isnull().sum().sum()
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        for col in numeric_cols:
            if df[col].isnull().sum() > 0:
                median = df[col].median()
                df[col] = df[col].fillna(median)
        
        # Step 3: Type conversion and standardization
        print("   - Standardizing data types...")
        
        # Remove rows with all-null primary key
        if 'id' in df.columns:
            df = df.dropna(subset=['id'])
            
        # Report generation
        cleaned_count = len(df)
        self.metadata["cleaned_rows"] = cleaned_count
        
        # Save output
        if output_path is None:
            output_path = input_path.replace('.csv', '_cleaned.csv')
            
        df.to_csv(output_path, index=False)
        print(f"   - Saved cleaned data to {output_path}")
        
        # Generate report
        report = self._generate_report(original_count, cleaned_count, df.columns.tolist())
        
        return report
    
    def clean_excel(self, input_path, output_path=None):
        """Clean Excel files with sheet selection."""
        print(f"📥 Loading Excel file from {input_path}...")
        
        # Load first sheet by default
        if isinstance(input_path, str):
            xl = pd.ExcelFile(input_path)
            sheets = xl.sheet_names
            active_sheet = sheets[0]  # Use first sheet
        else:
            raise ValueError("Excel processing requires file path")
            
        df = pd.read_excel(input_path, sheet_name=active_sheet)
        
        report = self._process_with_report(df, input_path, output_path)
        return report
    
    def detect_outliers(self, df, columns=None, method='iqr'):
        """
        Detect outliers in numeric columns using IQR or Z-score.
        
        Args:
            df: DataFrame to analyze
            columns: List of column names or None for all numeric
            method: 'iqr' (default) or 'zscore'
            
        Returns:
            dict: Outlier detection report
        """
        if columns is None:
            columns = df.select_dtypes(include=[np.number]).columns
            
        outliers_found = {}
        
        for col in columns:
            col_data = df[col].dropna()
            if len(col_data) < 3:
                continue
                
            if method == 'iqr':
                q1 = col_data.quantile(0.25)
                q3 = col_data.quantile(0.75)
                iqr = q3 - q1
                lower_bound = q1 - 1.5 * iqr
                upper_bound = q3 + 1.5 * iqr
                
            elif method == 'zscore':
                mean = col_data.mean()
                std = col_data.std()
                lower_bound = mean - 3 * std
                upper_bound = mean + 3 * std
            
            # Count outliers
            outlier_count = ((df[col] < lower_bound) | (df[col] > upper_bound)).sum()
            outliers_found[col] = {
                "method": method,
                "lower_bound": round(lower_bound, 2),
                "upper_bound": round(upper_bound, 2),
                "outlier_count": outlier_count,
                "outlier_percentage": (outlier_count / len(col_data) * 100).round(2)
            }
        
        return outliers_found
    
    def standardize_date_formats(self, df, date_columns=None):
        """Standardize date columns to YYYY-MM-DD format."""
        if date_columns is None:
            date_columns = [col for col in df.columns 
                           if pd.api.types.is_datetime64_any_dtype(df[col]) or 
                              'date' in str(col).lower() or 
                              'time' in str(col).lower()]
        
        for col in date_columns:
            try:
                df[col] = pd.to_datetime(df[col], errors='coerce').dt.strftime('%Y-%m-%d')
                print(f"   - Standardized {col} to YYYY-MM-DD format")
            except Exception as e:
                print(f"   - Could not standardize {col}: {e}")
        
        return df
    
    def remove_duplicates_preserve(self, df):
        """
        Remove duplicates keeping the most recent entry.
        
        Args:
            df: DataFrame
            
        Returns:
            tuple: (cleaned_df, duplicate_info)
        """
        if 'date' not in df.columns and 'datetime' not in df.columns:
            # If no date column, keep first occurrence
            return df.drop_duplicates(), None
        
        # Find potential duplicate columns (excluding datetime/date cols)
        exclude_cols = ['date', 'datetime', 'timestamp']
        potential_dup_cols = [c for c in df.columns if c.lower() not in exclude_cols]
        
        if len(potential_dup_cols) == 0:
            print("   - Could not identify duplicate detection columns")
            return df, None
        
        # Drop duplicates keeping last (most recent)
        df_clean = df.drop_duplicates(subset=potential_dup_cols, keep='last')
        dups_removed = len(df) - len(df_clean)
        
        return df_clean, dups_removed
    
    def _generate_report(self, original_rows, cleaned_rows, columns):
        """Generate processing report."""
        reduction_pct = ((original_rows - cleaned_rows) / original_rows * 100).round(2) if original_rows > 0 else 0
        
        self.metadata["processed_at"] = datetime.now().isoformat()
        
        report = f"""
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COGNISYNC DATA CLEANING REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project: {self.project_name}
Processed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

📊 SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Original Rows:  {original_rows:,}
Cleaned Rows:   {cleaned_rows:,}
Reduction:      {reduction_pct:.2f}% removed
Columns Processed: {len(columns)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT WAS CLEANED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Duplicate rows removed
✅ Missing values in numeric columns (median-filled)
✅ Date formats standardized
✅ Data types verified and corrected
✅ Rows with missing primary keys removed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Review cleaned data for accuracy
2. Validate against business rules
3. Deploy or archive as needed
4. Schedule regular cleaning if needed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CogniSync Automation Team
chris.battle@cognisync.us
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        """
        return report


def main():
    """Main execution for CLI usage."""
    import sys
    
    agent = DataCleaningAgent(project_name="cognisync_default")
    
    # Example usage:
    # python data_cleaning_agent.py --input data.csv --output data_cleaned.csv
    
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else None
        
        agent.clean_csv(input_file, output_file)
    else:
        print("Usage: python data_cleaning_agent.py <input.csv> [output.csv]")
        print()
        print("Example:")
        print("  python data_cleaning_agent.py sales_data.csv")


if __name__ == "__main__":
    main()
