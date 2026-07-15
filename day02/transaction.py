try:
    with open("transaction.txt","r")as file:
        customer_spend={}
        for line in file:
            line=line.strip()
            if not line:
                continue
            name,amount_str=line.split(",")
            amount=float(amount_str)
            #accumalate the total into a dictionary
            customer_spend[name]=customer_spend.get(name,0.0)+amount
    sorted_customers=sorted(customer_spend.items(),key =lambda item:item[1],reverse=True)
    with open("report.txt","w")as output_file:
        print("summary of customer spending")
        for name,total in sorted_customers:
            output_line=f"{name}:${total:.2f}"
            print(output_line)
            output_file.write(output_line+ "\n")
except FileNotFoundError:
    print("transaction.txt file not found")
    print("please create the new file in this directory")