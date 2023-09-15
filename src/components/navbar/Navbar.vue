<template>
    <nav>
        <div className='mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8'>
            <div className="relative flex h-[60px] items-center justify-between">
                <a href="/" class="flex items-center mr-4 flex-none">
                    <svg class="mr-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="32" height="32" fill="url(#pattern0)"/>
                        <defs>
                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#image0_0_1" transform="scale(0.03125)"/>
                            </pattern>
                            <image id="image0_0_1" width="32" height="32" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAhlSURBVFiFlZd7cNTVFcc/9/4eu5tsQt4Jr0giAsVIhEJVQA0GpkPLVMVp6/ShrbbWUact0dHa8VWZPqivEVutrePUcdqptT4GqVYEDMaIWl62QAiGJJJHCWxCyG52f/t73f7xI5ssSVDPzM7u/n7nnu/3nvO9594r+Ay28jdqimdwTY7BlQgW2w5lnkIXAgWgFELTcKRSJ4VgR9oTm1WYlxtvFYlPiy3O9vKSR1UkT3IfinVleXhJW+UMpgRCQFnUZ16Zy9wyj6WVPq4Hu3olH8d09Z8ezepPSoTiKd3gF2/8WAx9bgJ1D6urdMELIQM9GlKyfziY7sWVDmtrLUw98KspCb73x7LHt/ZpvHYwnOo9JROu4utvN4gdn5nAqkfUd4TGs2suUEYq7bHlkE5eWHF7XZKCiJ/xGwH/+36dhC1YON3B0EbjzCsSPLUzpLpOiVdbE/r1m24U8TOx5Djwx9StusGfHvyaMspzbba06Mwp9Vi/OkFBxEcpeKvV5Jn3I5kxHQMae7p14ukgXOeARoEh0aXilksssWyWc3W+5+9auVEtPGsGVmxUlwuHxrHPZhZ63LEimfnveIJ/fBTiGzUOtdO8cakHaOsz+eMHJo+tSeFID18JWo9pfBzTn3mrzXi6sUHsGkdg9UaVrxQtP7qMiprytPz5JpO0C+u/kkAKaD2uM22KR15ITVr3EaspgRMJQW9KoZ1GGE4L3jwUUs3tRl8cqnc2iFRWCXzF/eeVUbxynie3tUL/sODmpUmkgJY+nWffD5NyBIXhTwcHKI0G4CeGJW8dMskNKZbMdERBjl8YVdyblYHL1qsqI5eP51WgoXwOH5dUFnr89PIg9ScSkpQrqCzwqCmBvrhkz7Hx+l1Qrpia5yPFKMFhW7Bhay7fXGQxu8TjvSMmmw6YtiaY+maDGNABzCjXT5+CVz9XaXs/8fF9ybWLrEzg0qifNbsHtoY5OiixHEGOqTJ+vg+GBlctSLN4pgNArqloWDFMWIeQrphV5FIa1b3+pLwBeFgHCBt89weXYlYX2bz+X4OiXF9V5PnixLDkjRaT6xZbzJoymvpbL01yyhLc93qUX69JZJHb16tx75YIRTk+1cUeAAWRUZKFOYr55V7knQ55G/CwXr9RzU+lqX5oCyjfJGkLlsx0BcDuo3pGJFFj4pqPBQfQTY+62TY7O40MAYDBlOCFvWF+uzrFkZiHr4wZdRvUDInDospikk9c63PTcgsFrJibBmB5tcPaBemzqr4id/T3yPv8sGIwmd1ick1Fe0wjnpYU5SgKIyql6SyTKBZUFmEOJKDlmIYApuUHNY+GFAsr1KTgACWn+9HB/tFnH/XozCz0svwMDf5wTZLSqE9+SFEe9U0FC3UhWbGvC/3wMcGQZYAIABNpwe5ug5oSe2Lk07ajPdgUuuJgOYJ9PTonU5LrllhZfkEWg4mFdYgYyhSCCj1iMPD9ZbC0yuXxbYKPujUfkL1Dkt1HDbjInnD2I6Lc3GKSGMMxnhYMpgR7unWWVztjwOHwCY2kA0NOsCIMjam6p8jf3QmxuKRnUOCrYH3XneNTYEwMDhA+velcf1Fy3LvOAY0nmyLMKPD5QtloKZo6dLqGYFmVi1IgFJ5MeyR7BqEjJrE9sL2gORXlKK6Y7UwIXpUvSKQDoklbkLQF3ugmyawij4urHPb26JxbMPp8yUyXC6e7uB6kXIHj0yV9j3cvmIFz15d96uc4KIUYSdnWdolSZJmJ5MrnotzwYiD/uzdHuXtzlL/tCWf5FUQU2hm7vTQ8Zpd6uB4kbRwFPbrQOLn9EGIwKTmZ0FFA6wmJI3ye/3eE1eenqalwM0HmlPhs/WGc5u6gET2+dtwWD8CwJZkaHWW/PxbsC6W5PmlX0J/U0j60Sd9ic8pG1s4Q1E730IXiX4fNIGWVDu6Y1TS24Uxmrg9N7QbNHTqr5wUl7IoHS/O5D8M4HgxZkpMpkaNctuuNd4u2Nb9TnSVRqi86R7HzE0Vzp6bq5yLqzhuV9/ziUZCbXs6h55TMlGCspWzB1Hyf+1dZVOQFwjiVhrQnWF7lMGxJeockhlDt2+6Ux3QAy6Z5/T+pipgh4biQdhF9cUn56QA9pyQ1JX4mlTdenMJyJj5Ozi9WlJ6ReoAvVQbZ6IhpHOjTUy7iz3D6POD6NAiw19XDnatsck3Fi3sDUVmu4MmmHN4/qmeC5pqK4lx/ws+Z4Alb0NIXjE27gvaYTiwpcOH3GQKNd4iYlDzx0l7Si6s0vlpj0xbTOHpS8sVyxT31FpY7eTsesYk08nRzhAP/C5rG8SHJB126heLxxnViMEMAIG7xYFsf8Xs2aSo2bBA2FRubcvAJ1m9JfrASBobHnWMnBB8hWz/H5uraNMO24J0jpupPyoGUw69G/DLRmu8S8bTPTw724kdCkhXneXi+YN2mnExQpeCJpghPvxdhMjuekKzfHqK9P5j1hdNdQPBhp8Hubt2xfa5svmv0eJ41nbcbxF+Bm7e1YK08X+O2y9IcPK5x8ysBCSHgZ6uSmR4P8JddYV7ZF2HQCkT5bodOyhEU5wSi9ZWgqc3gtQMh24dbxp6IYZKLycpH1beA5/PCSKUUQ5Ygz1TcUZ99MQEYTuoMpARXnOsQ0rN14vmCzftDascRw/EV1227XbxwJtakV7MrHlHfMzUeKp9CXu00P7T9sMByBEsqHa6ptQidcTWDbPCWPp2X9oXSA5aMuT7f/lxXsxGre0CFQwXcq6ChNBc/5WRfTpdWuiya4TGzIMjKB92S1uO62t2l20Np4Qt4xB3il40PCGsyjLMSGLFlG1Re2GBtSOcqAYttn3LPwxBSKZRAKYSUytOgXwmaHU+8aru8MlZsk9n/AayrvGw3SgE5AAAAAElFTkSuQmCC"/>
                        </defs>
                    </svg>    
                    <span class="self-center text-2xl font-semibold font-cursive font-display whitespace-nowrap text-white">Coinsver</span>
                </a>
                <div class="flex-none">
                    <ul class="font-medium flex flex-row items-center font-sans md:space-x-8">
                        <li>
                            <a href="https://rapidapi.com/Coinranking/api/coinranking1" target="_blank" rel="noopener"
                                class="hidden md:block text-white hover:text-blue-500">Rapidapi</a>
                        </li>
                        <li>
                            <a href="https://developers.coinranking.com/api" target="_blank" rel="noopener"
                                class="hidden md:block text-white hover:text-blue-500">Coinranking</a>
                        </li>
                        <li>
                            <a href="https://www.chartjs.org/docs/latest" target="_blank" rel="noopener"
                                class="hidden md:block text-white hover:text-blue-500">Chartjs</a>
                        </li>
                        <li>
                            <a href="https://github.com/yeferson321/Api-coins" target="_blank" rel="noopener"
                                class="block text-white hover:text-black px-5 py-1.5 border border-white rounded-lg hover:bg-white transition duration-450 ease-in-out">GitHub</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>