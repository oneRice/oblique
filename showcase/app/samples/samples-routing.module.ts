import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DatepickerComponent} from './datepicker/datepicker.component';
import {NavigableSampleComponent} from './navigable/navigable-sample.component';
import {SchemaValidationComponent} from './schema-validation/schema-validation-sample.component';
import {MultiselectSampleComponent} from './multiselect/multiselect-sample.component';

const samplesRoutes: Routes = [
	{path: 'datepicker', component: DatepickerComponent},
	{path: 'navigable', component: NavigableSampleComponent, data: {
		title: 'Navigable Sample',
		description: 'Description for the Navigable Sample'
	}},
	{path: 'multiselect', component: MultiselectSampleComponent},
	{path: 'schema-validation', component: SchemaValidationComponent}
];

@NgModule({
	imports: [
		RouterModule.forChild(samplesRoutes)
	],
	exports: [
		RouterModule
	]
})
export class SamplesRoutingModule {
}
