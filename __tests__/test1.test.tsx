import '@testing-library/jest-dom';
import getCompanies from '@/libs/getCompanies';
import CompanyCatalog from '@/components/CompanyCatalog';
import { screen, render, waitFor } from '@testing-library/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';

jest.mock('next-auth', () => ({
    getServerSession: jest.fn().mockResolvedValue({
        user: {
            _id: '1',
            name: 'Test User',
            tel: '1234567890',
            email: 'test@example.com',
            role: 'admin',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDEyYjJlZGU2NWMxYzZkNGMyZmM2YSIsImlhdCI6MTcxMTgxMDE3MSwiZXhwIjoxNzE0NDAyMTcxfQ.sUbpwVPJIHcNwCq1zp4LFxE3tz18M8gZxEaYXfaCANs',
        },
        expires: (new Date()).toString()
    })
}));


describe('Get Company', () => {
  var companyPromise:Promise<Object>
  var companyJsonResult:Object
  beforeEach(async () => {
    companyPromise = getCompanies()
    companyJsonResult = await companyPromise
  })

  it('getCompany must return correct results', () => {
    const resultData = companyJsonResult.data
    expect(companyJsonResult.count).toBe(5) 
    expect(resultData).toHaveLength(5)
    const ids = ["65fff1f9afe86fefab90a4c6", "65fff283afe86fefab90a4c9", "65fff30a805b9732e70d4e95", "65fff383805b9732e70d4e98", "66002a3da177f649d2cd8f2c"]
    expect(ids).toContain(resultData[0].id)
  })

  it('Company Catalog should have correct number of images', async () => {
    const catalog = await CompanyCatalog({companyJson: companyJsonResult})
    render(catalog) 

    await waitFor(() => {
      const companyImages = screen.queryAllByRole('img')
      expect(companyImages.length).toBe(5)
    })

  })


})