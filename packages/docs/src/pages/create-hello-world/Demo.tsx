import { Runkit } from '../../components/Runable'
import { createHelloWorldServer } from '../../demoSourceAsStrings/demoSource'
import React from 'react'

export const Demo = () => <Runkit source={createHelloWorldServer} />
