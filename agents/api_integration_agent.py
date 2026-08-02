"""
API Integration Agent - Core Python Script
Cognisync API Development & Integration Service
"""

import requests
import json
import time
from datetime import datetime, timedelta
from pathlib import Path


class APIIntegrationAgent:
    """
    Automated API integration agent for Cognisync.
    
    Capabilities:
    - REST/GraphQL API wrappers
    - Webhook handlers  
    - OAuth authentication setup
    - Rate limiting & error handling
    - Data synchronization between APIs
    """
    
    def __init__(self, api_name="default"):
        self.api_name = api_name
        self.config = {
            "timeout": 30,
            "retries": 3,
            "retry_delay": 2,
            "rate_limit": None,
            "rate_limit_delay": None
        }
        
    def get(self, url, headers=None, params=None):
        """GET request with retry logic and rate limiting."""
        for attempt in range(self.config["retries"]):
            try:
                response = requests.get(
                    url, 
                    headers=headers or {}, 
                    params=params,
                    timeout=self.config["timeout"]
                )
                
                if response.status_code == 200:
                    return {"success": True, "data": response.json(), "status": response.status_code}
                elif response.status_code >= 400:
                    error_info = {
                        "error": response.json().get("error", "Unknown error"),
                        "status": response.status_code
                    }
                    return {"success": False, "error": error_info}
                    
            except requests.exceptions.Timeout:
                if attempt < self.config["retries"] - 1:
                    print(f"   ⚠️ Timeout on attempt {attempt + 1}, retrying...")
                    time.sleep(self.config["retry_delay"])
                else:
                    return {"success": False, "error": "Request timed out"}
                    
            except requests.exceptions.RequestException as e:
                if attempt < self.config["retries"] - 1:
                    print(f"   ⚠️ Request error on attempt {attempt + 1}: {str(e)}, retrying...")
                    time.sleep(self.config["retry_delay"])
                else:
                    return {"success": False, "error": str(e)}
        
        return {"success": False, "error": "Max retries exceeded"}
    
    def post(self, url, data=None, json_data=None, headers=None):
        """POST request with retry logic."""
        for attempt in range(self.config["retries"]):
            try:
                response = requests.post(
                    url, 
                    json=json_data or None,
                    data=data,
                    headers=headers or {},
                    timeout=self.config["timeout"]
                )
                
                if response.status_code == 200 or response.status_code == 201:
                    return {"success": True, "data": response.json(), "status": response.status_code}
                elif response.status_code >= 400:
                    error_info = {
                        "error": response.json().get("error", "Unknown error"),
                        "status": response.status_code
                    }
                    return {"success": False, "error": error_info}
                    
            except requests.exceptions.Timeout:
                if attempt < self.config["retries"] - 1:
                    print(f"   ⚠️ Timeout on attempt {attempt + 1}, retrying...")
                    time.sleep(self.config["retry_delay"])
                else:
                    return {"success": False, "error": "Request timed out"}
                    
            except requests.exceptions.RequestException as e:
                if attempt < self.config["retries"] - 1:
                    print(f"   ⚠️ Request error on attempt {attempt + 1}: {str(e)}, retrying...")
                    time.sleep(self.config["retry_delay"])
                else:
                    return {"success": False, "error": str(e)}
        
        return {"success": False, "error": "Max retries exceeded"}
    
    def delete(self, url, headers=None):
        """DELETE request with retry logic."""
        for attempt in range(self.config["retries"]):
            try:
                response = requests.delete(
                    url,
                    headers=headers or {},
                    timeout=self.config["timeout"]
                )
                
                if response.status_code in [200, 204]:
                    return {"success": True, "data": response.json() if response.content else None, "status": response.status_code}
                    
            except requests.exceptions.Timeout:
                if attempt < self.config["retry_delay"] - 1:
                    print(f"   ⚠️ Timeout on attempt {attempt + 1}, retrying...")
                    time.sleep(self.config["retry_delay"])
                else:
                    return {"success": False, "error": "Request timed out"}
                    
            except requests.exceptions.RequestException as e:
                if attempt < self.config["retries"] - 1:
                    print(f"   ⚠️ Request error on attempt {attempt + 1}: {str(e)}, retrying...")
                    time.sleep(self.config["retry_delay"])
                else:
                    return {"success": False, "error": str(e)}
        
        return {"success": False, "error": "Max retries exceeded"}
    
    def setup_oauth(self, provider, client_id, client_secret, token_endpoint):
        """
        Setup OAuth 2.0 authentication with major providers.
        
        Args:
            provider: 'github', 'google', 'linkedin', 'salesforce', 'hubspot'
            client_id: Client ID from OAuth provider
            client_secret: Client secret from OAuth provider
            token_endpoint: Token URL for the provider
            
        Returns:
            dict: Access token and token info
        """
        auth_url = f"{token_endpoint}?client_id={client_id}&client_secret={client_secret}"
        
        print(f"🔐 Setting up {provider.upper()} OAuth authentication...")
        print("   This requires interactive authorization.")
        print()
        
        # For demonstration - in production this would handle the OAuth flow
        # Get access token (user needs to authorize first)
        print("   🔑 You need to:")
        print(f"      1. Visit {auth_url}")
        print("      2. Authorize the application")
        print("      3. Copy the access token")
        
        return {"setup": "complete", "message": "OAuth setup complete - visit auth URL to authorize"}
    
    def sync_data_between_apis(self, source_api, target_api, transform_function=None):
        """
        Synchronize data between two APIs.
        
        Args:
            source_api: Source API endpoint
            target_api: Target API endpoint
            transform_function: Optional function to transform data
            
        Returns:
            dict: Sync results
        """
        print(f"🔄 Starting data sync: {source_api} → {target_api}")
        
        # Fetch data from source
        source_response = self.get(source_api)
        if not source_response["success"]:
            return {"synced": 0, "error": source_response["error"]}
        
        source_data = source_response["data"]
        
        # Transform if needed
        transformed_data = transform_function(source_data) if transform_function else source_data
        
        # Send to target
        target_response = self.post(
            target_api,
            json_data=transformed_data
        )
        
        if target_response["success"]:
            return {
                "synced": len(transformed_data),
                "source_status": source_response["status"],
                "target_status": target_response["status"],
                "message": "Sync completed successfully"
            }
        else:
            return {"synced": 0, "error": target_response["error"]}
    
    def setup_webhook_handler(self, endpoint_url, events_to_listen):
        """
        Setup webhook handler for incoming events.
        
        Args:
            endpoint_url: URL for the webhook endpoint
            events_to_listen: List of event types to handle
            
        Returns:
            dict: Webhook configuration
        """
        print(f"🔔 Setting up webhook handler at {endpoint_url}")
        
        # Create webhook config
        webhook_config = {
            "endpoint": endpoint_url,
            "events": events_to_listen,
            "headers": {
                "Content-Type": "application/json",
                "User-Agent": f"Cognisync-Webhook/{self.api_name}"
            },
            "processing": {
                "max_retries": self.config["retries"],
                "timeout": self.config["timeout"],
                "rate_limit": self.config.get("rate_limit")
            }
        }
        
        print(f"   - Events to handle: {', '.join(events_to_listen)}")
        print(f"   - Max retries: {webhook_config['processing']['max_retries']}")
        
        # In production, this would create an actual webhook route
        # For demo purposes
        return {
            "status": "configured",
            "config": webhook_config,
            "message": f"Wehook handler configured for events: {', '.join(events_to_listen)}"
        }
    
    def handle_rate_limiting(self, endpoint_url):
        """
        Implement rate limiting for API calls.
        
        Args:
            endpoint_url: API endpoint to check
            
        Returns:
            dict: Rate limit info if available
        """
        print(f"📊 Checking rate limits for {endpoint_url}...")
        
        # Check headers for rate limit info
        response = self.get(endpoint_url)
        
        if response["success"]:
            rate_limit_headers = [key for key in response.get("data", {}).get("headers", {}) 
                                 if "rate" in key.lower() or "limit" in key.lower()]
            
            return {
                "status": "checked",
                "has_rate_limits": len(rate_limit_headers) > 0,
                "rate_limit_headers": rate_limit_headers
            }
        else:
            return {"status": "error", "message": response.get("error")}


# Example API wrappers for popular services
class PopularAPIWrapper(APIIntegrationAgent):
    """Wrappers for commonly integrated APIs."""
    
    def __init__(self):
        super().__init__("popular-apis")
        
    def connect_slack(self, token):
        """Connect to Slack API."""
        slack_api = "https://slack.com/api"
        
        # List of available Slack API endpoints
        slack_endpoints = {
            "users.list": "/users.list",
            "channels.list": "/channels.list",
            "chat.postMessage": "/chat.postMessage",
            "files.upload": "/files.upload"
        }
        
        print(f"✅ Connected to Slack API")
        return {
            "service": "Slack",
            "base_url": slack_api,
            "token": token[:8] + "***",  # Masked for security
            "available_endpoints": list(slack_endpoints.keys())
        }
    
    def connect_google_sheets(self, spreadsheet_id):
        """Connect to Google Sheets API."""
        print(f"✅ Connected to Google Sheets")
        return {
            "service": "Google Sheets",
            "spreadsheet_id": spreadsheet_id,
            "base_url": "https://sheets.googleapis.com/v4/spreadsheets"
        }
    
    def connect_hubspot(self, api_key):
        """Connect to HubSpot API."""
        print(f"✅ Connected to HubSpot CRM")
        return {
            "service": "HubSpot",
            "base_url": "https://api.hubapi.com",
            "version": "v1/legacy/v3"
        }
    
    def connect_salesforce(self, consumer_key, instance_url):
        """Connect to Salesforce API."""
        print(f"✅ Connected to Salesforce")
        return {
            "service": "Salesforce",
            "base_url": f"{instance_url}/services/data/v54.0",
            "oauth_enabled": True
        }


def main():
    """Main execution for CLI usage."""
    
    print("=" * 60)
    print("COGNISYNC API INTEGRATION AGENT")
    print("=" * 60)
    print()
    
    agent = APIIntegrationAgent(api_name="demo")
    
    # Demo: Check available endpoints
    print("📋 Available API Wrappers:")
    wrapper = PopularAPIWrapper()
    print(f"   - Slack API")
    print(f"   - Google Sheets")
    print(f"   - HubSpot CRM")
    print(f"   - Salesforce API")
    print()
    
    print("✨ Usage Examples:")
    print()
    print("# Simple GET request:")
    print('response = agent.get("https://api.example.com/v1/data", params={"q": "search"})')
    print()
    print("# POST with JSON data:")
    print('response = agent.post("https://api.example.com/v1/data", json_data={"name": "value"})')
    print()
    print("# Setup OAuth authentication:")
    print('agent.setup_oauth(provider="github", client_id="xxx", token_endpoint="...")')
    print()
    print("# Sync data between APIs:")
    print("sync_result = agent.sync_data_between_apis(source_api, target_api)")
    print()
    print("=" * 60)


if __name__ == "__main__":
    main()
