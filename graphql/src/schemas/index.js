import userSchema from './user.schema';
import locationSchema from './location.schema';
import employeeSchema from './employee.schema';
import configurationSchema from './configuration.schema';
import activitySchema from './activity.schema';
import groupSchema from './group.schema';
import registerSchema from './register.schema';
import companySchema from './company.schema';

import { gql } from 'apollo-server';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }

`;

export default [linkSchema, companySchema,userSchema,employeeSchema, locationSchema,configurationSchema,activitySchema,groupSchema,registerSchema];