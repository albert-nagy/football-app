import { TestBed } from '@angular/core/testing';

import { CompetitionResolverService } from './competition-resolver.service';

describe('CompetitionResolverService', () => {
  let service: CompetitionResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
