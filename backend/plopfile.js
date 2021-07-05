const endpointsPrompts = [
  {
    type: 'input',
    name: 'schemaName',
    message: 'Schema name: ',
  },
  {
    type: 'input',
    name: 'schemaPluralName',
    message: 'Schema plural name: ',
  },
];
module.exports = function (plop) {
  // controller generator
  plop.setGenerator('endpoint', {
    description: 'application controller logic',
    prompts: endpointsPrompts,
    actions: [
      {
        type: 'addMany',
        destination: 'src/api/{{camelCase schemaPluralName}}',
        templateFiles: 'plop_templates/endpoint/**/*.hbs',
        base: 'plop_templates/endpoint',
      },
    ],
  });
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: endpointsPrompts,
    actions: [
      {
        type: 'addMany',
        destination: 'src/api/{{camelCase schemaPluralName}}',
        templateFiles: 'plop_templates/endpoint/*.controller.ts.hbs',
        base: 'plop_templates/endpoint',
      },
    ],
  });
  plop.setGenerator('service', {
    description: 'application controller logic',
    prompts: endpointsPrompts,
    actions: [
      {
        type: 'addMany',
        destination: 'src/api/{{camelCase schemaPluralName}}',
        templateFiles: 'plop_templates/endpoint/*.service.ts.hbs',
        base: 'plop_templates/endpoint',
      },
    ],
  });
  plop.setGenerator('dtos', {
    description: 'application controller logic',
    prompts: endpointsPrompts,
    actions: [
      {
        type: 'addMany',
        destination: 'src/api/{{camelCase schemaPluralName}}',
        templateFiles: 'plop_templates/endpoint/dto/*.hbs',
        base: 'plop_templates/endpoint',
      },
    ],
  });
};
