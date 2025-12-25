# Tasks
1. SignIn flow update
   - get all the roles to show roles in the SignIn form 
   - On signin check the role is valid for the user, if so authenticate
   - Keep the role in the token that is saved in cookie for further use  
2. When request comes, check for whether the role is permited to access the resource
3. Metadata Management
   - Add roles
4. UI to add roles to User
5. Some functions that can be implemented
   * isAdmin(user)  
   * canAccess(user)  
     + checks whether the user have permission to access this resource

refer : https://robertgeedev.medium.com/nextauth-js-complete-role-based-authentication-setup-38774cc6f0c4
   