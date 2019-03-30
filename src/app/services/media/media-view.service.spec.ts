import { TestBed } from '@angular/core/testing';

import { MediaViewService } from './media-view.service';

describe('MediaViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaViewService = TestBed.get(MediaViewService);
    expect(service).toBeTruthy();
  });
});
