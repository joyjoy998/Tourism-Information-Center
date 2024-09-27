这里有两份 code,
simulate_mustsuccess.py 是一定能成功够跑完所有流程的,
另一份 simulate_mayfail.py 是有设置了几率失败的,可能是 payment fail,也有可能是 system fail,也有可能是用户不感兴趣就 exit 的,
注意,这两份 py 都用了 pandas 库,所以如果你没装,记得先 pip3 install pandas(用 macos 的话),然后 python3 simulate_mayfail.py 的话,就会在当前目录生成 tour_booking_log.csv,
现在这个目录里是 simulate_mayfail.py 生成的 sample.csv.

## 注意

其他 service 要套这个模板的话,只需要改开头的 activities 跟 simulate_booking_process(num_cases)的 function
(因为每个 service 的 activity 都不一样,所以是写不到一个改一下就好的模板的,只能说一下怎么写 prompt 让 gpt 协助你改,见谅)

## 步骤

1.请尽量把你的 activity 分成 user 的跟 service_provider 的,然后按顺序在其后边用#number 来标记
(resource 简单分为 user 跟细分化的各个 system 功能,service_provider_activities 这个变量下的 key 就是它的 resource)

2.然后用这个提示词"#后边代表顺序,请你帮我完善代码,让它能按顺序生成业务流程."

3.等到它生成一个百分百成功的 generate event log 之后,再提要求让它可能性的生成一些 if condition 的错误,提示词比如:"现在我想请你模拟一些错误,比如系统无法响应,用户在看完不感兴趣就退出,支付错误等等,当这些错误发生时,这个 case 就会结束"
