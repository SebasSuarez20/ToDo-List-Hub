import { Directive, Input, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureService } from '../services/feature.service';

@Directive({
  selector: '[appFeature]'
})
export class Feature {

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly firebaseService:FeatureService) { }

    @Input() set appFeature(flag: string) {

    const isEnabled = this.firebaseService.getBoolean(flag);
    this.viewContainer.clear();

    if (isEnabled) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
