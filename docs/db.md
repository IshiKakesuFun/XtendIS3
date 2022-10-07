```mermaid
erDiagram
    User ||--|| UserProfile: has
    Group }|--o| Type: of
    Endpoint }|--o| Group: "member of"
    AuditLog
    LiveLog }|..|| Endpoint: "about" 
    Device
```