import { TestBed } from '@angular/core/testing';

import { MatchResolverService } from './match-resolver.service';

describe('MatchResolverService', () => {
  let service: MatchResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
