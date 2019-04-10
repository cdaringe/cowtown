import { Runkit } from '../../components/Runable'
import { stackMiddlewaresServer } from '../../demoSourceAsStrings/demoSource'
import React from 'react'

export const Demo = () => <Runkit source={stackMiddlewaresServer} />
