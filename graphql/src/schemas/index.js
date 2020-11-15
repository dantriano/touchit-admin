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
/*const schema = mergeSchemas({
  schemas: [activitySchema, groupSchema],
  links: [
    {
      name: 'group',
      from: 'Group',
      to: 'Activity',
      resolveArgs: parent => ({ _id: parent.cityName }),
      fragment: `
        fragment WeatherLocationArgs on Event {
          cityName
        }
      `,
    },
  ],
});*/

export default [linkSchema, companySchema,userSchema,employeeSchema, locationSchema,configurationSchema,activitySchema,groupSchema,registerSchema];