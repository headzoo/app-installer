import {AppInstallerService} from '../../main/javascript/AppInstallerService';

test('createCustomFields sends the expected request when given valid arguments', done => {
  "use strict";

  const api = {
    post: jest.fn().mockReturnValueOnce(Promise.resolve()),
    put: jest.fn()
  };

  new AppInstallerService({ api }).createCustomFields(
    12,
    {
      customFields: [
        {type: "dataJson", alias: 'fieldA', attachedTo: 'ticket', title: 'Field A'},
        {type: "dataList", alias: 'fieldB', attachedTo: 'organization', title: 'Field B'},
        {type: "data", alias: 'fieldC', attachedTo: 'person', title: 'Field C'},
      ]
    });

  expect(api.post.mock.calls.length).toBe(1);
  expect(api.put.mock.calls.length).toBe(0);

  expect(api.post.mock.calls[0][0]).toBe('batch');
  expect(api.post.mock.calls[0][1]).toEqual({
    requests: {
      fieldA: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: '/ticket_custom_fields',
        data: {
          title: 'Field A',
          is_enabled: true,
          is_agent_field: true,
          alias:  'app:12:fieldA',
          handler_class: 'Application\\DeskPRO\\CustomFields\\Handler\\DataJson'
        }
      },
      fieldB: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: '/organization_custom_fields',
        data: {
          title: 'Field B',
          is_enabled: true,
          is_agent_field: true,
          alias:  'app:12:fieldB',
          handler_class: 'Application\\DeskPRO\\CustomFields\\Handler\\DataList'
        }
      },
      fieldC: {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: '/person_custom_fields',
        data: {
          title: 'Field C',
          is_enabled: true,
          is_agent_field: true,
          alias:  'app:12:fieldC',
          handler_class: 'Application\\DeskPRO\\CustomFields\\Handler\\Data'
        }
      },
    }
  });


  done();
});

test('saveSettings sends the expected request when given valid arguments', done => {
  "use strict";

  const api = {
    post: jest.fn().mockReturnValueOnce(Promise.resolve()),
    put: jest.fn()
  };

  new AppInstallerService({ api }).saveSettings(
    12,
    24,
    {
      settingA: 'A',
      settingB: 1
    });

  expect(api.post.mock.calls.length).toBe(1);
  expect(api.put.mock.calls.length).toBe(0);

  expect(api.post.mock.calls[0][0]).toBe('batch');
  expect(api.post.mock.calls[0][1]).toEqual({
    requests: {
      settingA: {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: 'apps/12/state/app:24/settingA',
        data: { value: 'A' }
      },
      settingB: {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: 'apps/12/state/app:24/settingB',
        data: { value: 1 }
      },

    }
  });


  done();
});
