import React, { Component } from 'react';

class ChatbotComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      chatHistory: [], // Use this to display chat history
    };
  }

  handleUserMessageChange = (e) => {
    this.setState({ userMessage: e.target.value });
  };

  handleUserMessageSubmit = () => {
    const userMessage = this.state.userMessage;

    // Send user message to your chatbot API
    fetch('http://0.0.0.0:8000/chatbot/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('API request failed');
        }
      })
      .then((data) => {
        const botResponse = data.bot_response;

        // Update chat history with user's message and bot's response
        this.setState((prevState) => ({
          userMessage: '',
          chatHistory: [
            ...prevState.chatHistory,
            { role: 'user', content: userMessage },
            { role: 'bot', content: botResponse },
          ],
        }));
      })
      .catch((error) => {
        // Handle API error here
        console.error('API request error:', error);
      });
  };

  render() {
    return (
      <div className="chatbot-container">
        <div className="chat-history">
          {this.state.chatHistory.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          value={this.state.userMessage}
          onChange={this.handleUserMessageChange}
        />
        <button onClick={this.handleUserMessageSubmit}>Send</button>
      </div>
    );
  }
}

export default ChatbotComponent;