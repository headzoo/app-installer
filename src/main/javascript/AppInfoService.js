export class AppInfoService
{
  /**
   * @param api
   * @param appId
   * @param appVersion
   * @return {Promise.<string>}
   */
  determineAssetEndpoint({ api, appId, appVersion })
  {
    return api.get('helpdesk/discover')
      .then(({ body }) => body.data.helpdesk_url)
      .then(helpdeskUrl => `${helpdeskUrl.replace(/\/+$/, '')}/file.php/apps/${appId}/v${appVersion}/files/assets`)
      ;
  }

  /**
   * @param api
   * @param instanceId
   * @return {Promise.<{}>}
   */
  determineInstallType({ api, instanceId })
  {
    return api.get(`apps/${instanceId}/status`)
      .then(({ body }) => {
        return body;
      })
      .then(({ is_installed }) => {
        return is_installed ? 'update' : 'first-time';
      })
      ;
  }

  /**
   * @return {Promise.<{}>}
   */
  loadManifest({ api, instanceId  })
  {
    return api.get(`apps/${instanceId}/manifest`).then(({ body }) => body);
  }

}