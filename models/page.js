import mongoose from 'mongoose';

import pageSchma from '../schema/page.js';

// 输出page模型类
export default mongoose.model('page', pageSchma);