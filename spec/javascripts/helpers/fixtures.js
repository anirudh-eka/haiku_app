beforeEach(function() {
  
  this.fixture = {
    
    Poems: {
      valid: { // response starts here
        "status": "OK",
        "version": "1.0",
        "response": [
            {
              "id": 1,
              "title": "once upon a time",
              "content": "I could write a poem"
            },
            {
              "id": 2,
              "content": "when i found a pen, life took lines"
            }
          ]
      } 
    }
    
  };
  
});