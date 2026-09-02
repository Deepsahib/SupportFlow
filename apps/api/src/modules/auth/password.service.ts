import bcrypt from 'bcrypt'

export const hashPassword = async(password: string):Promise<string>=> {
  const hashedPassword=await bcrypt.hash(password,10);
  return hashedPassword;
}

export const comparePassword=async(password:string,hashedPassword:string):Promise<Boolean>=>{
    return bcrypt.compare(password,hashedPassword)
}