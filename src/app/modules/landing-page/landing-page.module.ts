import { NgModule } from '@angular/core';
import { SharedModule } from 'shared';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  imports: [LandingPageRoutingModule, SharedModule],
  declarations: [LandingPageComponent]
})
export class LandingPageModule {}
