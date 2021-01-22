import { ComponentPortal } from '@angular/cdk/portal';

import { BaseUiComponent } from 'src/app/building-blocks/base-ui/base-ui.component';

export interface ViewComponent {
  component: ComponentPortal<BaseUiComponent>;
  id: number;
}
