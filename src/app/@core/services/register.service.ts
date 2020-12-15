import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Register } from "app/@core/models";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class RegisterService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
    this.fragment = RegisterService.fragment;
    console.log(88)
  }
  converToModel(x) {
    return new Register().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveRegister($input: registerInput!) {
      saveRegister(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeRegister($input: registerInput!) {
      removeRegister(input: $input)
    }
  `;
  oneQuery = gql`
    query($input: registerInput!) {
      register(input: $input) {
        ...registerFragment
      }
    }
  `;
  listQuery = gql`
    query($input: registerInput) {
      registers(input: $input) {
        ...registerFragment
      }
    }
  `;
  static fragment = gql`
    fragment registerFragment on Register {
      __typename
      _id
      activity
      employee
      start
      end
      inPosition
      location {
        lat
        lng
      }
      delay
      _employee {
        firstName
        lastName
      }
      _activity {
        name
      }
    }
  `;
}
