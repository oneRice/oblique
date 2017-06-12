import {Component} from '@angular/core';
import {NgbTooltipConfig, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(tooltipConfig: NgbTooltipConfig, datepickerConfig: NgbDatepickerConfig) {
		tooltipConfig.container = 'body';
		datepickerConfig.navigation = 'arrows';
	}
}