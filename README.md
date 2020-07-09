# Engineer.ai

### Definition:

1. Periodically (10 seconds) poll following api for posts https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0 
2. New posts must be appended to old posts
3. Also implement pagination for the list. On end of list page number should be increased and GET request.
4. Periodic fetch and pagination must be mutually exclusive. Both should increase page count. Same page count request must not be made more than once.
5. Display title, author, url and created at time of post 
6. Upon selecting row, open new screen with raw JSON data of post
