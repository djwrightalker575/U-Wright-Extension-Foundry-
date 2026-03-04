export interface ProjectConfig {
  name: string;
  extensionType: 'popup' | 'sidebar' | 'content-script';
  targetBrowsers: string[];
}

export interface ExportPackage {
  filename: string;
  size: string;
  createdAt: string;
}
