const e=`---\r
title: AI Server Set Up\r
slug: ai-server-set-up\r
date: 2026-09-09\r
summary: Documenting the set up of my AI server\r
tags: hardware, linux, gpu, amd, amd ai 9 hx470\r
---\r
\r
# Hardware\r
\r
- AMD Ryzen AI 9 HX470 with 64Gb RAM\r
- AMD Radeon 890M\r
- Code name: Gorgon Point\r
\r
See: https://www.amd.com/en/products/processors/laptop/ryzen/ai-400-series/amd-ryzen-ai-9-hx-470.html\r
\r
# Configure Memory\r
\r
Reduce the reserved memory allocation for the GPU to a minimum to prevent out-of-memory (OOM) errors occuring.\r
\r
This is an APU with a unified memory architecture, the gpu and system memory use the same RAM. Reducing the reserved memory for the GPU ensures there is enough memory for the model and operating system. This may not work well for systems that do not have a unified memory architecture.\r
\r
## Configure Shared Memory In BIOS\r
\r
### Reduce Reserved Memory For GPU To Minimum\r
TODO: Get the exact terms and menus\r
\r
### Ensure BAR Is Enabled\r
\r
## Configure GRUB For Extended GPU Memory\r
\r
Open /etc/default/grub using a text editor with root privileges:\r
\`\`\`javascript\r
sudo nano /etc/default/grub\r
\`\`\`\r
\r
Add the ttm memory pool parameters to the command line. 8388608 is the number of 4KB pages to give 32KB.\r
\`\`\`javascript\r
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash ttm.pages_limit=8388608 ttm.page_pool_size=8388608 amdttm.pages_limit=8388608 amdttm.page_pool_size=8388608"\r
\`\`\`\r
NOTE: amdttm should be used on older kernels. It is included because it for robustness.\r
\r
TODO: Add a table of values to make it easier to avoid calculating values\r
\r
### amdgpu.gttsize=126976\r
Allocates system ram to the Graphics Translation Table (GTT).\r
\r
By default, the AMD driver sets the GTT size to only 50% or 75% of your total system RAM. Manually increasing this limit helps prevent out-of-memory (OOM) errors during large compute tasks by allowing the GPU to spill over into a larger portion of your system's RAM.\r
\r
Math: 124 GB * 1024 = 126976\r
\r
| Memory Size (Gb) | Value  |\r
| ---------------- | ------ |\r
|               48 |  49152 |\r
|               64 |  65536 |\r
|              124 | 126976 |\r
\r
\r
TODO: Investigate amdgpu.gartsize=2048\r
\r
## Other Options That Have Been Suggested\r
\r
### amd_iommu=of\r
Force-enables the AMD IOMMU driver, or force-disables it in this case.\r
\r
It translates DMA addresses into physical memory addresses using page tables that the operating system controls.\r
\r
Disabling this potentially opens the system up to memory attacks but may improve performance.\r
\r
This requires a BIOS change as well.\r
\r
See: https://askubuntu.com/questions/1552302/implications-of-setting-amd-iommu-off\r
\r
### iommu=pt\r
Enables Passthrough mode. This prevents the driver from touching devices that aren't being explicitly passed to a virtual machine, optimising performance.\r
\r
This requires a BIOS change as well.\r
\r
See: https://askubuntu.com/questions/841390/amd-system-fresh-install-only-usb-3-working-iommu\r
\r
### amdgpu.vm_fragment_size=9\r
Enables large page support.\r
\r
Historically it was recommended to set this parameter but on modern apus it is not recommended. This could result in suboptimal allocation or wasted TLB cache lines.\r
\r
The syntax of this module parameter is amdgpu.vm_fragment_size=X, where the actual fragment size is 4KB * 2^X. The default is X=4, which means 64KB. To get 2MB fragments, set X=9.\r
\r
See: https://www.amd.com/en/resources/support-articles/release-notes/RN-PRORAD-LIN-AMDGPUPRO-17-40.html\r
\r
- Default (-1): The driver automatically optimizes the page fragment allocation based on your specific APU model and hardware layout.\r
- Value 4: Results in 64 KB fragments (4 KB × 2⁴).\r
- Value 9: Results in 2 MB fragments (4 KB × 2⁹).\r
\r
## Update GRUB\r
\`\`\`javascript\r
sudo update-grub\r
sudo reboot\r
\`\`\`\r
\r
## Verify Change\r
\`\`\`javascript\r
cat /proc/cmdline\r
\`\`\`\r
\r
You should see the settings above in the output.\r
\r
## Getting Started\r
\r
Vue.js is a powerful framework for building user interfaces. This blog is built with Vue 3 and Vite, making it fast and efficient.\r
\r
\`\`\`javascript\r
const message = 'Hello, World!';\r
console.log(message);\r
\`\`\`\r
\r
I hope you enjoy reading my content!\r
`;export{e as default};
