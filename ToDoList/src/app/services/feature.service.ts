  
import { Injectable, inject } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';
import { LoggerService } from './logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private remoteConfig = inject(RemoteConfig);

  constructor(private logger:LoggerService){}

  async init() {
    try {
      this.remoteConfig.settings = {
        minimumFetchIntervalMillis: 0, 
        fetchTimeoutMillis: 60000      
      };
  
      await fetchAndActivate(this.remoteConfig);
      this.logger.log("Remote ","Config activated");
    } catch (err) {
      this.logger.error("Error activating Remote Config",`${err}`)
    }
  }

  getBoolean(flag:string): boolean {
    const value = getValue(this.remoteConfig,flag).asBoolean();
    return value;
  }
}