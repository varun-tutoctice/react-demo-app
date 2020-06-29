import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_PKHD3KUtb', 
    ClientId: '7pmo5idudaltoo013f2u4nku36' 
};
  
export default new CognitoUserPool(poolData);