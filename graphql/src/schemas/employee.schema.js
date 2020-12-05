import { gql } from 'apollo-server';
/*import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Types } from 'mongoose';
const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.prototype.valueOf = function () {
	return this.toString();
};
/*export const mongooseIDResolver = {
  _id: {
    type: GraphQLNonNull(GraphQLString),
    description: 'mongoose _id',
    resolve: ({ _id }: { _id: Types.ObjectId}) => ({ _id: _id.toString() }),
  },
};*/
//(new mongoose.Types.ObjectId()).toString(),
const employeeSchema = gql`
  type Employee {
    _id: ID!
    employeeCode: String
    firstName: String
    lastName: String
    email: String
    isLinked: Boolean
    linkCode: String
    status: String
    avatar: String
    groups:[ID]
    company:ID
    mainActivity: ID
    customActivities:[selectionType]
    options: [String]
  }


  type selectionType{
    _id: ID
    name: String
    status: String
  }
  input employeeInput  {
    _id: ID, 
    groups: [ID],
    employeeCode: String,
    firstName: String,
    lastName: String,
    email: String,
    isLinked:Boolean,
    linkCode:String,
    avatar:String,
    status:String,
    customActivities:[selectionInput],
    mainActivity: ID,
    company: ID,
    options: [String]
  }
  
  input selectionInput  {
    _id: ID, 
    status: String,
    type: String
  }
  extend type Query {
    employeeByMail(email: String): Employee
    employee(input: employeeInput): Employee
    employees(input: employeeInput): [Employee]
  }
  
  extend type Mutation {
    removeEmployee(_id: ID!): Boolean
    saveEmployee(input:employeeInput!): Boolean
  }

  extend type Employee {
    getCustomActivities:[selectionType]
    _groups: [Group]
  }
`;
export default employeeSchema;
/* */