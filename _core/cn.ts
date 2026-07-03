import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

// eslint-disable-next-line tailwindcss/no-custom-classname -- false positive: the plugin inspects clsx() args and misreads the `inputs` identifier as a classname
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export default cn
