import { Moon, Settings, Sun, UserPlus } from 'lucide-react';
import { getCollections } from '../actions/getCollections';
import { CollectionsSelect } from './CollectionsSelect';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@radix-ui/react-dropdown-menu';
import { SettingsDropdown } from './SettingsDropdown';

export const Sidebar = async () => {
  const collections = await getCollections();
  return (
    <div className='p-4 py-8 flex flex-col sticky top-0 left-0 items-center justify-between h-screen bg-gray-100 dark:bg-gray-950 '>
      {' '}
      {collections && <CollectionsSelect collections={collections} />}
      <SettingsDropdown />
    </div>
  );
};
