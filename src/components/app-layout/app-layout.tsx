import type { ReactNode } from "react";
import { Sidebar } from "../ui/sidebar/sidebar";
import { SidebarContent } from "../ui/sidebar/sidebar-content";
import { SidebarFooter } from "../ui/sidebar/sidebar-footer";
import { SidebarHeader } from "../ui/sidebar/sidebar-header";
import { SidebarInset } from "../ui/sidebar/sidebar-inset";
import { SidebarItem } from "../ui/sidebar/sidebar-item";
import { SidebarProvider } from "../ui/sidebar/sidebar-provider";
import { SidebarSection } from "../ui/sidebar/sidebar-section";
import { SidebarSectionGroup } from "../ui/sidebar/sidebar-section-group";

interface Props {
	children: ReactNode;
}

export function AppLayout(props: Props) {
	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader>
					<span>Header!</span>
				</SidebarHeader>

				<SidebarContent>
					<SidebarSectionGroup>
						<SidebarSection label="Test">
							<SidebarItem tooltip="Hello">Item 1</SidebarItem>
							<SidebarItem tooltip="Hello">Item 2</SidebarItem>
							<SidebarItem tooltip="Hello">Item 3</SidebarItem>
							<SidebarItem tooltip="Hello">Item 4</SidebarItem>
							<SidebarItem tooltip="Hello">Item 5</SidebarItem>
							<SidebarItem tooltip="Hello">Item 6</SidebarItem>
							<SidebarItem tooltip="Hello">Item 7</SidebarItem>
							<SidebarItem tooltip="Hello">Item 8</SidebarItem>
							<SidebarItem tooltip="Hello">Item 9</SidebarItem>
						</SidebarSection>

						<SidebarSection label="Test">
							<SidebarItem tooltip="Hello">Item 1</SidebarItem>
							<SidebarItem tooltip="Hello">Item 2</SidebarItem>
							<SidebarItem tooltip="Hello">Item 3</SidebarItem>
							<SidebarItem tooltip="Hello">Item 4</SidebarItem>
							<SidebarItem tooltip="Hello">Item 5</SidebarItem>
							<SidebarItem tooltip="Hello">Item 6</SidebarItem>
							<SidebarItem tooltip="Hello">Item 7</SidebarItem>
							<SidebarItem tooltip="Hello">Item 8</SidebarItem>
							<SidebarItem tooltip="Hello">Item 9</SidebarItem>
						</SidebarSection>
					</SidebarSectionGroup>

					<span>Hello</span>
				</SidebarContent>

				<SidebarFooter>
					<span>Footer!</span>
				</SidebarFooter>
			</Sidebar>

			<SidebarInset>{props.children}</SidebarInset>
		</SidebarProvider>
	);
}
