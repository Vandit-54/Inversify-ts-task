-> This project is testing project which i am trying to build in ioc / inversify js structure 

-> In this project the flow would be like there will be main three parts the product side , the user side , the cart configurations 

-> The user intractions will be like 
    - crud functionalitites 
    - profile crud functionalities 
    - maximum 5 profile per user 
    - if the user wants to delete their account the profiles should be deleted first 
    - User will be provided with access token : validity - 2D
    - User will be provided with refresh token : validity - 7D
    - otp login 
    - password requirement for eveytime profile deletion (Double safety)
    - If the user wants delete the account 
            -> First check how many profiles are there exist for the user if none then procede with delete 
            -> If there are profile existed throw an error you can remove this profile this profiles are still
            active 
    - Whenever any things is in the cart main user should also be mailed with those detials 

-> Product will be fetched from the third party api 
   -- https://dummyjson.com/products

-> Cart intractions 
  -- cart will be based on the profile every cart will contain profile name & profile i'd along side of cart i'd , product details , amount calculations , brand name , quantity feilds 