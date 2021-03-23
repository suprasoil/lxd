
import Syncable from './syncable';

export default class Backup extends Syncable {
  constructor(volume, name) {
    super(volume.client, name);
    this.volume = volume;
  }

  url() {
    return `${this.volume.url()}/backups/${this.name()}`;
  }

  async create() {
    await this.client.async_operation().post(`${this.volume.url()}/backups`, this.config);
    return this.load();
  }

  async destroy() {
    await this.client.async_operation().request('DELETE', this.url());
    return this.unload();
  }

}