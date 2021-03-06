import {ObTelemetryMessage} from './telemetry-message';
import {TestBed} from '@angular/core/testing';
import {ObTelemetryService} from './telemetry.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {windowProvider, WINDOW} from '../utilities';

describe('TelemetryService', () => {
	let service: ObTelemetryService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [{provide: WINDOW, useFactory: windowProvider}]
		});

		service = TestBed.get(ObTelemetryService);
		httpMock = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should store telemetry messages', () => {
		const message: ObTelemetryMessage = {
			obliqueModuleName: 'testmodule',
			obliqueVersion: 'testversion',
			applicationName: 'testapplication',
			applicationVersion: 'testappversion'
		};

		service['storeMessage'](message);

		expect(service['telemetryRecords'].length).toBe(1);
	});

	it('should not store equal messages multiple times', () => {
		const message1: ObTelemetryMessage = {
			obliqueModuleName: 'testmodule',
			obliqueVersion: 'testversion',
			applicationName: 'testapplication',
			applicationVersion: 'testappversion'
		};

		const message2: ObTelemetryMessage = {
			obliqueModuleName: 'testmodule',
			obliqueVersion: 'testversion',
			applicationName: 'testapplication',
			applicationVersion: 'testappversion'
		};

		service['storeMessage'](message1);
		service['storeMessage'](message2);

		expect(service['telemetryRecords'].length).toBe(1);
	});

	it('should send the stored messages correctly', () => {
		const message: ObTelemetryMessage = {
			obliqueModuleName: 'testmodule',
			obliqueVersion: 'testversion',
			applicationName: 'testapplication',
			applicationVersion: 'testappversion'
		};

		service['storeMessage'](message);

		service['sendMessages']();

		const mockReq = httpMock.expectOne(service['TELEMETRY_URL']);

		expect(mockReq.cancelled).toBeFalsy();
		expect(mockReq.request.method).toEqual('POST');
	});
});
