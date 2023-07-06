import { createSchema } from 'graphql-yoga'
import { people } from "./data.js"

export const schema = createSchema({
typeDefs:`

type People {
   id: Int,
   firstName:String,
   lastName:String,
   dateOfBirth:String,
   functions:String,
   experience: Int,
}

type Query {
    people: [People],
    person (id: Int): People
    }

 `,
 resolvers: {
 Query: {
  people : () => people,
  person: (parent, args) => {
    const data = people.find((person) => person.id === args.id);
    return data;
  }
},
 }
})