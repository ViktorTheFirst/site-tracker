import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import {
  columns,
  type SiteRecord,
} from '@/components/functional/Table/columns';
import { DataTable } from '@/components/functional/Table/data-table';
import { Button } from '@/components/ui/button';
import { SiteStatus } from '@/interfaces/general';

export const mockData: SiteRecord[] = [
  {
    id: '1',
    name: 'banana.net/',
    hostingProvider: 'https://www.godaddy.com',
    hostingLogin: 'banana_admin',
    hostingPassword: 'Banana123!',
    hostingValiduntil: '31/12/2025',
    domainRegistrar: 'https://www.godaddy.com',
    domainLogin: 'banana_owner',
    domainPassword: 'DomainBanana2025',
    domainValiduntil: '15/01/2026',
    comments: 'Renew hosting before end of year.',
    status: SiteStatus.ACTIVE,
    lastModifiedBy: 'Alice',
  },
  {
    id: '2',
    name: 'https://cinemaworld.com',
    hostingProvider: 'https://www.bluehost.com',
    hostingLogin: 'cinema_admin',
    hostingPassword: 'C1nema!234',
    hostingValiduntil: '10/09/2025',
    domainRegistrar: 'https://www.namecheap.com',
    domainLogin: 'cinema_owner',
    domainPassword: 'DomCinema#99',
    domainValiduntil: '01/02/2026',
    comments: 'SSL expiring soon.',
    status: SiteStatus.ACTIVE,
    lastModifiedBy: 'Bob',
  },
  {
    id: '3',
    name: 'https://travelstory.net',
    hostingProvider: 'https://www.siteground.com',
    hostingLogin: 'travel_admin',
    hostingPassword: 'Tr@vel2025',
    hostingValiduntil: '01/07/2025',
    domainRegistrar: 'https://www.godaddy.com',
    domainLogin: 'travel_owner',
    domainPassword: 'DomTr@vel22',
    domainValiduntil: '25/12/2025',
    comments: 'Consider migrating to VPS.',
    status: SiteStatus.INACTIVE,
    lastModifiedBy: 'Charlie',
  },
  {
    id: '4',
    name: 'techhub.io',
    hostingProvider: 'https://www.hostgator.com',
    hostingLogin: 'techhub_root',
    hostingPassword: 'Tech#Hub456',
    hostingValiduntil: '20/01/2026',
    domainRegistrar: 'https://www.namecheap.com',
    domainLogin: 'techhub_admin',
    domainPassword: 'D0mainTech!',
    domainValiduntil: '15/03/2026',
    comments: 'All systems stable.',
    status: SiteStatus.ACTIVE,
    lastModifiedBy: 'Dana',
  },
  {
    id: '5',
    name: 'http://foodiesparadise.com',
    hostingProvider: 'https://www.bluehost.com',
    hostingLogin: 'foodies_admin',
    hostingPassword: 'F00d!2025',
    hostingValiduntil: '05/10/2025',
    domainRegistrar: 'https://www.godaddy.com',
    domainLogin: 'foodies_user',
    domainPassword: 'DomFood#11',
    domainValiduntil: '22/04/2026',
    comments: 'Add staging server.',
    status: SiteStatus.ACTIVE,
    lastModifiedBy: 'Ethan',
  },
  {
    id: '6',
    name: 'https://bookhaven.org/',
    hostingProvider: 'https://www.siteground.com',
    hostingLogin: 'book_admin',
    hostingPassword: 'B00k$Pass',
    hostingValiduntil: '12/08/2025',
    domainRegistrar: 'https://www.namecheap.com',
    domainLogin: 'book_domain',
    domainPassword: 'D0mBook#44',
    domainValiduntil: '30/06/2026',
    comments: 'High traffic in summer.',
    status: SiteStatus.ACTIVE,
    lastModifiedBy: 'Alice',
  },
  {
    id: '7',
    name: 'https://fitnesspro.net',
    hostingProvider: 'https://www.hostgator.com',
    hostingLogin: 'fit_admin',
    hostingPassword: 'Fit!Pass123',
    hostingValiduntil: '01/11/2025',
    domainRegistrar: 'https://www.namecheap.com',
    domainLogin: 'fit_domain',
    domainPassword: 'DomFit#2025',
    domainValiduntil: '28/02/2026',
    comments: '',
    status: SiteStatus.INACTIVE,
    lastModifiedBy: 'Bob',
  },
  {
    id: '8',
    name: 'https://musichub.com',
    hostingProvider: 'https://www.bluehost.com',
    hostingLogin: 'music_admin',
    hostingPassword: 'Mus1c@123',
    hostingValiduntil: '01/01/2026',
    domainRegistrar: 'https://www.namecheap.com',
    domainLogin: 'music_domain',
    domainPassword: 'DomMusiC#1',
    domainValiduntil: '05/05/2026',
    comments: 'Backup scheduled weekly.',
    status: SiteStatus.ACTIVE,
    lastModifiedBy: 'Charlie',
  },
  {
    id: '9',
    name: 'http://artgallery.net/',
    hostingProvider: 'https://www.siteground.com',
    hostingLogin: 'art_admin',
    hostingPassword: 'Art!Gal22',
    hostingValiduntil: '15/09/2025',
    domainRegistrar: 'https://www.godaddy.com',
    domainLogin: 'art_domain',
    domainPassword: 'DomArt#77',
    domainValiduntil: '30/01/2026',
    comments: 'Check image hosting costs.',
    status: SiteStatus.INACTIVE,
    lastModifiedBy: 'Dana',
  },
  {
    id: '10',
    name: 'https://greenenergy.org/',
    hostingProvider: 'https://www.hostgator.com',
    hostingLogin: 'green_admin',
    hostingPassword: 'Gr33n!Energy',
    hostingValiduntil: '10/02/2026',
    domainRegistrar: 'https://www.namecheap.com',
    domainLogin: 'green_domain',
    domainPassword: 'DomGreen#55',
    domainValiduntil: '20/07/2026',
    comments: 'Promote eco campaign.',
    status: SiteStatus.ACTIVE,
    lastModifiedBy: 'Ethan',
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='container mx-auto py-2'>
      {/* Top Bar */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold tracking-tight'>Sites management</h2>
        <div className='flex gap-2'>
          <Button
            variant='default'
            className='flex items-center gap-1 cursor-pointer'
            onClick={() => navigate('/app/add-site')}
          >
            <Plus className='w-4 h-4' /> Add
          </Button>
        </div>
      </div>
      {/* Table */}
      <DataTable columns={columns} data={mockData} />
    </div>
  );
};

export default HomePage;
