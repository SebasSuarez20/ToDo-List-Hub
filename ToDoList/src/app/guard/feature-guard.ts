import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FeatureService } from '../services/feature.service';



export const featureGuard: CanActivateFn = (route, state) => {

  const feature = inject(FeatureService);
  const router = inject(Router);
  const isValidRoute = feature.getBoolean("enabled_router_to_doList");

  if (!isValidRoute) {
    return router.parseUrl("/not-available");
  }

  return true;
};
