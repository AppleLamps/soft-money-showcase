import { Link, useLocation } from 'react-router-dom';
import { Home, Receipt, ArrowLeftRight, FileText, TrendingUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/transactions', icon: Receipt, label: 'Transactions' },
  { path: '/transfer', icon: ArrowLeftRight, label: 'Transfer' },
  { path: '/bills', icon: FileText, label: 'Bills' },
  { path: '/insights', icon: TrendingUp, label: 'Insights' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar */}
        <Sidebar collapsible="icon" className="border-r border-border bg-card">
          <SidebarContent className="pt-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4">Navigation</SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.label}
                          className="w-full"
                        >
                          <Link to={item.path} className="flex items-center gap-3">
                            <Icon className="shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:flex hidden" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">BF</span>
                  </div>
                  <h1 className="text-xl font-semibold text-foreground">BankFlow</h1>
                </div>
              </div>
              <div className="text-sm text-muted-foreground hidden md:block">
                Welcome back, Sarah
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-6">
            {children}
          </main>

          {/* Bottom Navigation (Mobile) */}
          <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden shadow-lg z-50">
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className={cn('w-5 h-5', isActive && 'fill-current')} />
                    <span className="text-xs">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </SidebarProvider>
  );
};
