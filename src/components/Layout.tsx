import { Link, useLocation } from 'react-router-dom';
import { Home, Receipt, ArrowLeftRight, FileText, TrendingUp, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

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
        <Sidebar collapsible="icon" className="border-r-2 border-border bg-card shadow-sm">
          <SidebarContent className="pt-6 pb-4">
            {/* Sidebar Header with Logo */}
            <div className="px-4 pb-6 mb-4 border-b border-border">
              <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md shrink-0">
                  <span className="text-primary-foreground font-bold text-base">BF</span>
                </div>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <h2 className="text-lg font-bold text-foreground tracking-tight">BankFlow</h2>
                  <p className="text-xs text-muted-foreground">Banking Dashboard</p>
                </div>
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-3">
                <SidebarMenu className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.label}
                          size="lg"
                          className={cn(
                            "w-full transition-all duration-200",
                            isActive
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-semibold"
                              : "hover:bg-secondary/80 font-medium"
                          )}
                        >
                          <Link to={item.path} className="flex items-center gap-3">
                            <Icon className={cn(
                              "shrink-0 transition-transform",
                              isActive && "scale-110"
                            )} />
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

          {/* Sidebar Footer */}
          <SidebarFooter className="border-t border-border p-4">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <User className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-semibold text-foreground">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Premium Account</p>
              </div>
              <button
                className="group-data-[collapsible=icon]:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm backdrop-blur-sm bg-card/95">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:flex hidden" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-primary-foreground font-bold text-base">BF</span>
                  </div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight">BankFlow</h1>
                </div>
              </div>
              <div className="text-sm text-muted-foreground font-medium hidden md:block">
                Welcome back, <span className="text-foreground font-semibold">Sarah</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-6 py-8 pb-24 md:pb-8 max-w-7xl">
            {children}
          </main>

          {/* Bottom Navigation (Mobile) */}
          <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t-2 border-border md:hidden shadow-xl z-50">
            <div className="flex items-center justify-around py-3 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all min-w-[60px]',
                      isActive
                        ? 'text-foreground bg-primary/5 scale-105'
                        : 'text-muted-foreground hover:text-foreground hover:bg-gray-100'
                    )}
                  >
                    <Icon className={cn('w-6 h-6', isActive && 'stroke-[2.5]')} />
                    <span className={cn('text-xs font-medium', isActive && 'font-semibold')}>{item.label}</span>
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
