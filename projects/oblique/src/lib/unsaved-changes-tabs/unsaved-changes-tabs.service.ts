import {Injectable} from '@angular/core';
import {ControlContainer} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {NgbTabChangeEvent, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {ObUnsavedChangesService} from '../unsaved-changes/unsaved-changes.service';

//TODO: Handle modals
@Injectable({providedIn: 'root'})
export class ObUnsavedChangesTabsService {
	private readonly listener: { [key: string]: Subscription} = {};

	constructor(private readonly translateService: TranslateService, private readonly unsavedChanges: ObUnsavedChangesService) {
	}

	watch(formId: string, form: ControlContainer): void {
		this.unsavedChanges.watch(formId, form);
	}

	unWatch(formId: string): void {
		this.unsavedChanges.unWatch(formId);
	}

	listenTo(ngbTabset: NgbTabset): void {
		const id = ngbTabset.tabs.first.id;
		if (!this.listener[id]) {
			this.listener[id] = ngbTabset.tabChange.subscribe((event: NgbTabChangeEvent): void => {
				if (!this.ignoreChanges([event.activeId])) {
					event.preventDefault();
				}
			});
		}
	}

	unListenTo(ngbTabset: NgbTabset): void {
		const id = ngbTabset && ngbTabset.tabs.first.id;
		if (this.listener[id]) {
			this.listener[id].unsubscribe();
			delete this.listener[id];
		}
	}

	canDeactivate(): boolean {
		return this.unsavedChanges.canDeactivate();
	}

	ignoreChanges(formIds: string[]): boolean {
		return this.unsavedChanges.ignoreChanges(formIds);
	}
}
