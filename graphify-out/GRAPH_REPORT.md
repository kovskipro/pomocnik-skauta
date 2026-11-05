# Graph Report - pomocnik-skauta  (2026-10-15)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 651 nodes · 1272 edges · 43 communities (36 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e52e209`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 41
- Community 42

## God Nodes (most connected - your core abstractions)
1. `cn()` - 232 edges
2. `react` - 59 edges
3. `lucide-react` - 26 edges
4. `HomePageClient()` - 20 edges
5. `compilerOptions` - 16 edges
6. `next` - 15 edges
7. `Button` - 14 edges
8. `FunctionPageClient()` - 13 edges
9. `class-variance-authority` - 11 edges
10. `ErrorBoundary` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ResizableHandle()` --calls--> `cn()`  [EXTRACTED]
  components/ui/resizable.tsx → lib/utils.ts
- `ResizablePanelGroup()` --calls--> `cn()`  [EXTRACTED]
  components/ui/resizable.tsx → lib/utils.ts
- `ContextMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  components/ui/context-menu.tsx → lib/utils.ts
- `SheetFooter()` --calls--> `cn()`  [EXTRACTED]
  components/ui/sheet.tsx → lib/utils.ts
- `SheetHeader()` --calls--> `cn()`  [EXTRACTED]
  components/ui/sheet.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (43 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (62): FunctionPageClient(), FunctionPageClientProps, LazyFooter, FunctionPage(), generateMetadata(), generateStaticParams(), cardGridVariants, cardItemVariants (+54 more)

### Community 1 - "Community 1"
Cohesion: 0.04
Nodes (53): dependencies, autoprefixer, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, framer-motion (+45 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (39): Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay (+31 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (39): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+31 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (13): metadata, RootLayout(), ErrorBoundary, ErrorBoundaryProps, ErrorBoundaryState, LenisProvider(), LenisProviderProps, Window (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.11
Nodes (23): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (24): name, private, version, autoprefixer, date-fns, eslint, @eslint/eslintrc, @eslint/js (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (14): HoverCardContent, PopoverContent, Progress, Slider, Textarea, clsx, @radix-ui/react-hover-card, @radix-ui/react-popover (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.16
Nodes (21): CardFooter, Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator (+13 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (17): Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+9 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (18): devDependencies, eslint, eslint-config-next, @eslint/eslintrc, @eslint/js, jest, jest-environment-jsdom, postcss (+10 more)

### Community 13 - "Community 13"
Cohesion: 0.18
Nodes (13): fetchFromRemoteFunctionApi(), GET(), revalidate, fetchFromRemoteFunctionsApi(), GET(), revalidate, db, DbClient (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.18
Nodes (14): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+6 more)

### Community 15 - "Community 15"
Cohesion: 0.17
Nodes (14): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+6 more)

### Community 16 - "Community 16"
Cohesion: 0.14
Nodes (10): ExternalLinkProps, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, ResizableHandle(), ResizablePanelGroup(), input-otp (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.21
Nodes (10): BadgeProps, badgeVariants, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants, class-variance-authority (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.24
Nodes (11): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartStyle(), ChartTooltipContent, getPayloadConfigFromPayload() (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (10): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+2 more)

### Community 20 - "Community 20"
Cohesion: 0.18
Nodes (10): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (7): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle, vaul

### Community 22 - "Community 22"
Cohesion: 0.28
Nodes (8): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport, @radix-ui/react-navigation-menu

### Community 23 - "Community 23"
Cohesion: 0.28
Nodes (8): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, @radix-ui/react-select

### Community 24 - "Community 24"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 25 - "Community 25"
Cohesion: 0.29
Nodes (3): ToasterProps, next-themes, sonner

### Community 26 - "Community 26"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, test:watch

### Community 27 - "Community 27"
Cohesion: 0.40
Nodes (4): AccordionContent, AccordionItem, AccordionTrigger, @radix-ui/react-accordion

### Community 28 - "Community 28"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 29 - "Community 29"
Cohesion: 0.40
Nodes (4): Avatar, AvatarFallback, AvatarImage, @radix-ui/react-avatar

### Community 30 - "Community 30"
Cohesion: 0.40
Nodes (4): Collapsible(), CollapsibleContent, CollapsibleTrigger, @radix-ui/react-collapsible

### Community 31 - "Community 31"
Cohesion: 0.40
Nodes (4): TabsContent, TabsList, TabsTrigger, @radix-ui/react-tabs

### Community 32 - "Community 32"
Cohesion: 0.40
Nodes (3): csp, nextConfig, securityHeaders

### Community 33 - "Community 33"
Cohesion: 0.50
Nodes (3): RadioGroup, RadioGroupItem, @radix-ui/react-radio-group

### Community 34 - "Community 34"
Cohesion: 0.67
Nodes (3): ScrollArea, ScrollBar, @radix-ui/react-scroll-area

### Community 35 - "Community 35"
Cohesion: 0.50
Nodes (3): config, createJestConfig, nextJest

## Knowledge Gaps
- **19 isolated node(s):** `autoprefixer`, `date-fns`, `eslint`, `@eslint/eslintrc`, `@eslint/js` (+14 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 231 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 8` to `Community 0`, `Community 2`, `Community 3`, `Community 4`, `Community 5`, `Community 7`, `Community 9`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 33`, `Community 34`, `Community 36`, `Community 37`?**
  _High betweenness centrality (0.284) - this node is a cross-community bridge._
- **What connects `autoprefixer`, `date-fns`, `eslint` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0595679012345679 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Community 7` to `Community 0`, `Community 2`, `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 8`, `Community 9`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 33`, `Community 34`, `Community 36`, `Community 37`?**
  _High betweenness centrality (0.232) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.03773584905660377 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Community 1` to `Community 6`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05673758865248227 - nodes in this community are weakly interconnected._