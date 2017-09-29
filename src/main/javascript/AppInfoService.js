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
   * @param appId
   * @return {Promise.<{}>}
   */
  determineInstallType({ api, appId })
  {
    return api.get(`apps/app:${appId}/status`)
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
  loadManifest({ api, appId  })
  {
    return api.get(`apps/app:${appId}/manifest`).then(({ body }) => body);
  }

}