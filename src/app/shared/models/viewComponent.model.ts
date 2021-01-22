import { ComponentPortal } from '@angular/cdk/portal';

import { BaseUiComponent } from 'src/app/core/components/base-ui/base-ui.component';

export interface ViewComponent {
  component: ComponentPortal<BaseUiComponent>;
  id: number;
}
