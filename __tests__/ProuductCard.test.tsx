import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '@/components/ProductCard';

describe('ProductCard', () => {
  it('renders product card with company name and image', async() => {
    const companyName = 'Company A';
    const imgSrc = '/img/image.jpg';

    render(<ProductCard companyName={companyName} imgSrc={imgSrc} />);

    const companyNameElement = screen.getByText(companyName);
    expect(companyNameElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img') as HTMLImageElement;
    expect(imageElement.src).toContain('image.jpg')
  });

});
