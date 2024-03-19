import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[hasRoles]',
})
export class HasRolesDirective {
  templateRef = inject(TemplateRef<any>);
  viewContainerRef = inject(ViewContainerRef);
  authService = inject(AuthService);

  @Input() set hasRoles(roles: string[]) {
    if (this.authService.hasRoles(roles)) {
      // Show the content
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      // Hide the content
      this.viewContainerRef.clear();
    }
  }
}
