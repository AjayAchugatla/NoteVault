import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <div className="flex justify-center px-4 lg:px-2 bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-2xl py-32">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                        Your Personal Note-Taking Sanctuary
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Capture, organize, and access your thoughts anytime, anywhere. Note-Vault provides a secure and intuitive platform for all your note-taking needs.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to={"/signup"}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Get started
                        </Link>
                        <a href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                    className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678"
                >
                    <path
                        fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                        fillOpacity=".3"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />
                    <defs>
                        <linearGradient
                            id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                            x1="1155.49"
                            x2="-78.208"
                            y1=".177"
                            y2="474.645"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#9089FC" />
                            <stop offset={1} stopColor="#FF80B5" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

