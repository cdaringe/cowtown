import { Runkit } from '../../components/Runable'
import { createABasicServerServer } from '../../demoSourceAsStrings/demoSource'
import React from 'react'

export const Demo = () => <Runkit source={createABasicServerServer} />
