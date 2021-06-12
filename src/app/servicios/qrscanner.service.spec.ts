import { TestBed } from '@angular/core/testing';

import { QRScannerService } from './qrscanner.service';

describe('QRScannerService', () => {
  let service: QRScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QRScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
