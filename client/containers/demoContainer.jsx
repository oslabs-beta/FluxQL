import React from 'react';
import DemoRow from '../components/demoRow';

export default function demoContainer() {
  const overview = `DraQLA is a GraphQL migration assistance tool that empowers developers to build GraphQL schemas by 
    introspecting existing PostGreSQL databases, all without writing any code.`;

  const info = [
    [
      `First, start by importing the desired PostgreSQL database that you want to convert into a GraphQL API and enter 
      the URI as prompted. (If you don't have one, feel free to test with our Sample Database!)`,
      '../assets/modal.gif',
      'Getting Started',
    ],
    [
      `DraQLa will immediately start by extracting all of your database's tables and relationships, 
      and will generate compatible GraphQL schemas, which consists of types and their corresponding 
      resolvers.`,
      '../assets/types.gif',
      'Extract Table Relationships',
    ],
    [
      `DraQLa also features a user friendly visual representation that depicts the parts of your database 
      that can now be queried and manipulated via GraphQL.`,
      '../assets/graphgif.gif',
      'Visualize Your Schema',
    ],
    [
      `The Advice Console provides an overview on: GraphQL schema, 
      how you and your clients can access and manipulate your database, and
      a sample query and mutation.`,
      '../assets/advice.gif',
      'Advice and Overview',
    ],
    [
      `In addition to your new schema, DraQLa spins up a temporary GraphQL server to allow you to test out 
      the sample query via GraphQL's Playground.`,
      '../assets/playground.gif',
      'Test Your Queries',
    ],
    [
      `When you're ready to adopt your schema, click "Export" to receieve the code and further integration 
    instructions.`,
      '',
      'Export Your Code',
    ],
  ];

  const rows = info.map((pair, i) => {
    return (
      <DemoRow
        key={i}
        index={i}
        text={pair[0]}
        gif={pair[1]}
        header={pair[2]}
      />
    );
  });

  return (
    <div className="demoContainer">
      <div className="demoOverview">
        <h1 id="overviewText">{overview}</h1>
      </div>
      {rows}
    </div>
  );
}
